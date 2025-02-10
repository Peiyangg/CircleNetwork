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
        const [nat_sparcc, art_sparcc, nat_spearman, art_spearman] = await Promise.all([
            processData(fetch, 'NAT_sparcc.json'),
            processData(fetch, 'ART_sparcc.json'),
            processData(fetch, 'NAT_spearman.json'),
            processData(fetch, 'ART_spearman.json'),
        ]);

        return {
            "Natural_sparcc": { nodes: nat_sparcc.nodes, links: nat_sparcc.links },
            "Artifical_sparcc": { nodes: art_sparcc.nodes, links: art_sparcc.links },
            "Natural_spearman": { nodes: nat_spearman.nodes, links: nat_spearman.links },
            "Artifical_spearman": { nodes: art_spearman.nodes, links: art_spearman.links },
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}