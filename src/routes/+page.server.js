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
        const [con_data, fmt1_data, fmt2_data, fmt3_data] = await Promise.all([
            processData(fetch, 'CON_sparcc.json'),
            processData(fetch, 'FMT1_sparcc.json'),
            processData(fetch, 'FMT2_sparcc.json'),
            processData(fetch, 'FMT3_sparcc.json')
        ]);

        return {
            "CON_14": { nodes: con_data.nodes, links: con_data.links },
            "FMT1_14": { nodes: fmt1_data.nodes, links: fmt1_data.links },
            "FMT2_14": { nodes: fmt2_data.nodes, links: fmt2_data.links },
            "FMT3_14": { nodes: fmt3_data.nodes, links: fmt3_data.links }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}