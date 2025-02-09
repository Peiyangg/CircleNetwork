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
        const [com_data, opt_data] = await Promise.all([
            processData(fetch, 'Compromised_sparcc.json'),
            processData(fetch, 'Optimal_sparcc.json')
        ]);

        return {
            "Compromised": { nodes: com_data.nodes, links: com_data.links },
            "Optimal": { nodes: opt_data.nodes, links: opt_data.links }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}