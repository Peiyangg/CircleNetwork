import { writable } from 'svelte/store';

// Factory function to create a new set of stores for each component
export function createNetworkStores() {
  // Core stores for shared state
  const selectedNodes = writable([]);
  const relatedLinks = writable([]);
  const brushActiveStore = writable(false);

  // Subscribe for debugging
  selectedNodes.subscribe(value => console.log('Selected nodes updated:', value));
  relatedLinks.subscribe(value => console.log('Related links updated:', value));

  return {
    selectedNodes,
    relatedLinks,
    brushActiveStore
  };
}