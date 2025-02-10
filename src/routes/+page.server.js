// Helper functions
const get_weight = (w) => {
    if (w == -2) { return 0 }
    return Math.abs(w);
}

const get_sign = (w) => {
    return w < 0 ? 'negative' : 'positive';
}

// Helper function to process nodes and links
const processData = async (fetch, filename) => {
    const response = await fetch(`/${filename}`);
    const data = await response.json();

    const nodes = data.nodes.map((d) => ({ 
        ...d, 
        cluster: d.cluster_hdbscan.toString(), 
        RelatedOrNot: false 
    }));
    
    const links = data.links.map((d) => ({
        ...d,
        weight: get_weight(d.sparcc),
        sign: get_sign(d.sparcc),
        RelatedOrNot: false
    }));

    return { nodes, links };
}

export const load = async ({ fetch }) => {
    try {
        // Load all network data
        const [con_sparcc, fmt1_sparcc, fmt2_sparcc, fmt3_sparcc,con_spearman, fmt1_spearman, fmt2_spearman, fmt3_spearman] = await Promise.all([
            processData(fetch, 'CON_sparcc.json'),
            processData(fetch, 'FMT1_sparcc.json'),
            processData(fetch, 'FMT2_sparcc.json'),
            processData(fetch, 'FMT3_sparcc.json'),
            processData(fetch, 'CON_spearman.json'),
            processData(fetch, 'FMT1_spearman.json'),
            processData(fetch, 'FMT2_spearman.json'),
            processData(fetch, 'FMT3_spearman.json')
        ]);

        return {
            "CON_14_sparcc": { nodes: con_sparcc.nodes, links: con_sparcc.links },
            "FMT1_14_sparcc": { nodes: fmt1_sparcc.nodes, links: fmt1_sparcc.links },
            "FMT2_14_sparcc": { nodes: fmt2_sparcc.nodes, links: fmt2_sparcc.links },
            "FMT3_14_sparcc": { nodes: fmt3_sparcc.nodes, links: fmt3_sparcc.links },
            "CON_14_spearman": { nodes: con_spearman.nodes, links: con_spearman.links },
            "FMT1_14_spearman": { nodes: fmt1_spearman.nodes, links: fmt1_spearman.links },
            "FMT2_14_spearman": { nodes: fmt2_spearman.nodes, links: fmt2_spearman.links },
            "FMT3_14_spearman": { nodes: fmt3_spearman.nodes, links: fmt3_spearman.links }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}