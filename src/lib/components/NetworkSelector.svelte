<script>
  import { createEventDispatcher } from 'svelte';
  
  export let data;
  export let selectedDataset;
  
  const dispatch = createEventDispatcher();
  
  // Create organized options for the dropdown
  const options = [
    {
      label: "Network Datasets",
      options: [
        { value: "Natural_sparcc", label: "Natural Pond (sparcc)" },
        { value: "Artifical_sparcc", label: "Artifical Pond (sparcc)" },
        { value: "Natural_spearman", label: "Natural Pond (spearman)" },
        { value: "Artifical_spearman", label: "Artifical Pond (spearman)" },
      ]
    }
  ];

  function handleChange(event) {
    const newValue = event.target.value;
    dispatch('change', { value: newValue });
  }
</script>

<div class="selector-container">
  <select 
    value={selectedDataset} 
    on:change={handleChange}
    class="network-select"
  >
    {#each options as group}
      <optgroup label={group.label}>
        {#each group.options as option}
          <option value={option.value}>
            {option.label}
          </option>
        {/each}
      </optgroup>
    {/each}
  </select>
</div>

<style>
  .selector-container {
    margin-bottom: 1rem;
  }
  
  .network-select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }
  
  .network-select:focus {
    outline: none;
    border-color: #666;
  }
</style>