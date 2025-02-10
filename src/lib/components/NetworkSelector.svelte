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
        { value: "CON_14_sparcc", label: "CON_D14 (sparcc)" },
        { value: "FMT1_14_sparcc", label: "FMT 1_D14 (sparcc)" },
        { value: "FMT2_14_sparcc", label: "FMT 2_D14 (sparcc)" },
        { value: "FMT3_14_sparcc", label: "FMT 3_D14 (sparcc)" },
        { value: "CON_14_spearman", label: "CON_D14 (spearman)" },
        { value: "FMT1_14_spearman", label: "FMT 1_D14 (spearman)" },
        { value: "FMT2_14_spearman", label: "FMT 2_D14 (spearman)" },
        { value: "FMT3_14_spearman", label: "FMT 3_D14 (spearman)" }
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