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

        const sparcc_response_e = await fetch('/e_scc_network.json');
        const sparcc_data_e = await sparcc_response_e.json();

        let sparcc_nodes_e = sparcc_data_e.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let sparcc_links_e = sparcc_data_e.links.map((d) => ({
            ...d,
            weight: get_weight(d.value),
            sign: get_sign(d.value),
            RelatedOrNot: false
        }));

        const sparcc_response_l = await fetch('/l_scc_network.json');
        const sparcc_data_l = await sparcc_response_l.json();

        let sparcc_nodes_l = sparcc_data_l.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let sparcc_links_l = sparcc_data_l.links.map((d) => ({
            ...d,
            weight: get_weight(d.value),
            sign: get_sign(d.value),
            RelatedOrNot: false
        }));

 

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

        // Early stage healthy data
        const healthy_early_response = await fetch('/healthy_sparcc_e.json');
        const healthy_early_data = await healthy_early_response.json();

        let healthy_early_nodes = healthy_early_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let healthy_early_links = healthy_early_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Early stage infected data
        const infected_early_response = await fetch('/infected_sparcc_e.json');
        const infected_early_data = await infected_early_response.json();

        let infected_early_nodes = infected_early_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let infected_early_links = infected_early_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Early stage inbetween data
        const inbetween_early_response = await fetch('/inbetween_sparcc_e.json');
        const inbetween_early_data = await inbetween_early_response.json();

        let inbetween_early_nodes = inbetween_early_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let inbetween_early_links = inbetween_early_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Late stage healthy data
        const healthy_late_response = await fetch('/healthy_sparcc_l.json');
        const healthy_late_data = await healthy_late_response.json();

        let healthy_late_nodes = healthy_late_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let healthy_late_links = healthy_late_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Late stage infected data
        const infected_late_response = await fetch('/infected_sparcc_l.json');
        const infected_late_data = await infected_late_response.json();

        let infected_late_nodes = infected_late_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let infected_late_links = infected_late_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        // Late stage inbetween data
        const inbetween_late_response = await fetch('/inbetween_sparcc_l.json');
        const inbetween_late_data = await inbetween_late_response.json();

        let inbetween_late_nodes = inbetween_late_data.nodes.map((d) => ({ 
            ...d, 
            cluster: d.cluster_hdbscan.toString(), 
            RelatedOrNot: false 
        }));
        let inbetween_late_links = inbetween_late_data.links.map((d) => ({
            ...d,
            weight: get_weight(d.sparcc),
            sign: get_sign(d.sparcc),
            RelatedOrNot: false
        }));

        return {
            "healthy": { "nodes": healthy_nodes, "links": healthy_links },
            "infested": { "nodes": infested_nodes, "links": infested_links },
            "r_healthy_e": { "nodes": healthy_early_nodes, "links": healthy_early_links },
            "r_infested_e": { "nodes": infected_early_nodes, "links": infected_early_links },
            "r_inbetween_e": { "nodes": inbetween_early_nodes, "links": inbetween_early_links },
            "r_healthy_l": { "nodes": healthy_late_nodes, "links": healthy_late_links },
            "r_infested_l": { "nodes": infected_late_nodes, "links": infected_late_links },
            "r_inbetween_l": { "nodes": inbetween_late_nodes, "links": inbetween_late_links },
            "e_sparcc": { "nodes": sparcc_nodes_e, "links": sparcc_links_e },
            "l_sparcc": { "nodes": sparcc_nodes_l, "links": sparcc_links_l }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}