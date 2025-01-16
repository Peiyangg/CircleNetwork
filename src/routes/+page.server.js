// Helper functions stay the same
const get_weight = (w) => {
    if (w == -2) { return 0 }
    return Math.abs(w);
}

const get_sign = (w) => {
    return w < 0 ? 'negative' : 'positive';
}

export const load = async ({ fetch }) => {
    try {
        // Fetch healthy data
        const healthy_response = await fetch('/w_h.json');
        const healthy_data = await healthy_response.json();

        let healthy_nodes = healthy_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let healthy_links = healthy_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Fetch infested data
        const infested_response = await fetch('/w_i.json');
        const infested_data = await infested_response.json();

        let infested_nodes = infested_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let infested_links = infested_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Fetch r_healthy data
        const r_healthy_response = await fetch('/r_h.json');
        const r_healthy_data = await r_healthy_response.json();

        let r_healthy_nodes = r_healthy_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let r_healthy_links = r_healthy_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Fetch r_infested data
        const r_infested_response = await fetch('/r_i.json');
        const r_infested_data = await r_infested_response.json();

        let r_infested_nodes = r_infested_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let r_infested_links = r_infested_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        return {
            "healthy": { "nodes": healthy_nodes, "links": healthy_links },
            "infested": { "nodes": infested_nodes, "links": infested_links },
            "r_healthy": { "nodes": r_healthy_nodes, "links": r_healthy_links },
            "r_infested": { "nodes": r_infested_nodes, "links": r_infested_links }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}