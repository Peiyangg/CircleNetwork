
import path from 'path';
import fs from 'fs';

const get_weight = (w) => {
    if (w == -2) { return 0 }
    return Math.abs(w);
}

const get_sign = (w) => {
    return w < 0 ? 'negative' : 'positive';
}

export const load = async () => {
    // AIR QUALITY DATA
    const healthy_file_path = path.resolve('static', w_h.json);
    const healthy_file_data = fs.readFileSync(healthy_file_path, 'utf-8');
    const healthy_data = JSON.parse(healthy_file_data);

    let healthy_nodes = healthy_data.nodes.map((d) => ({ ...d, cluster: d.cluster_hdbscan.toString(), RelatedOrNot: false }));
    let healthy_links = healthy_data.links.map((d) => ({
        ...d,
        weight: get_weight(d.sparcc),
        sign: get_sign(d.sparcc),
        RelatedOrNot: false
    }));

    const infested_file_path = path.resolve('static', w_i.json);
    const infested_file_data = fs.readFileSync(infested_file_path, 'utf-8');
    const infested_data = JSON.parse(infested_file_data);

    let infested_nodes = infested_data.nodes.map((d) => ({ ...d, cluster: d.cluster_hdbscan.toString(), RelatedOrNot: false }));
    let infested_links = infested_data.links.map((d) => ({
        ...d,
        weight: get_weight(d.sparcc),
        sign: get_sign(d.sparcc),
        RelatedOrNot: false
    }));

    const r_healthy_file_path = path.resolve('static', r_h.json);
    const r_healthy_file_data = fs.readFileSync(r_healthy_file_path, 'utf-8');
    const r_healthy_data = JSON.parse(r_healthy_file_data);

    let r_healthy_nodes = r_healthy_data.nodes.map((d) => ({ ...d, cluster: d.cluster_hdbscan.toString(), RelatedOrNot: false }));
    let r_healthy_links = r_healthy_data.links.map((d) => ({
        ...d,
        weight: get_weight(d.sparcc),
        sign: get_sign(d.sparcc),
        RelatedOrNot: false
    }));

    const r_infested_file_path = path.resolve('static', r_i.json);
    const r_infested_file_data = fs.readFileSync(r_infested_file_path, 'utf-8');
    const r_infested_data = JSON.parse(r_infested_file_data);

    let r_infested_nodes = r_infested_data.nodes.map((d) => ({ ...d, cluster: d.cluster_hdbscan.toString(), RelatedOrNot: false }));
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
        "r_infested": { "nodes": r_infested_nodes, "links": r_infested_links },

    }
}