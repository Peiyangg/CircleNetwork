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
        const [com_sparcc, opt_sparcc, com_spearman, opt_spearman] = await Promise.all([
            processData(fetch, 'Compromised_sparcc.json'),
            processData(fetch, 'Optimal_sparcc.json'),
            processData(fetch, 'Compromised_spearman.json'),
            processData(fetch, 'Optimal_spearman.json')
        ]);

        return {
            "Compromised_sparcc": { nodes: com_sparcc.nodes, links: com_sparcc.links },
            "Optimal_sparcc": { nodes: opt_sparcc.nodes, links: opt_sparcc.links },
            "Compromised_spearman": { nodes: com_spearman.nodes, links: com_spearman.links },
            "Optimal_spearman": { nodes: opt_spearman.nodes, links: opt_spearman.links },
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}