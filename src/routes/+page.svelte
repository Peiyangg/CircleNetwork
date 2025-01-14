<script>
  import NetworkGraphLeft from '$lib/components/NetworkGraphLeft.svelte';
  import NetworkGraphRight from '$lib/components/NetworkGraphRight.svelte';
  import { createNetworkStores } from './stores';


  export let data = {};
  let sizeTime = 7;
  let networkHeight = 600;
  let networkWidth = 600;

  const LinkedData = createNetworkStores();

</script>

<main>
  <h1>Network Graph</h1>

  <div class="graphs-container">
      <div class="graph-wrapper">
          <h2>Healthy Greenhouse Water Sample</h2>
          <NetworkGraphLeft graph={data.healthy} {networkWidth} {networkHeight} {sizeTime} stores={LinkedData}/>
        </div>

        <div class="graph-wrapper">
          <h2>Infested Greenhouse Water Sample</h2>
          <NetworkGraphRight graph={data.infested} {networkWidth} {networkHeight} {sizeTime} stores={LinkedData}/>
        </div>

        <!-- <div class="graph-wrapper">
          <h2>Healthy Greenhouse Rockwool Sample</h2>
          <NetworkGraph graph={data.r_healthy} {networkWidth} {networkHeight} {sizeTime}/>
        </div>

        <div class="graph-wrapper">
          <h2>Infested Greenhouse Rockwool Sample</h2>
          <NetworkGraph graph={data.r_infested} {networkWidth} {networkHeight} {sizeTime}/>
        </div> -->

    </div>
 
  
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #333;
  }

  .graphs-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .graph-wrapper {
    flex: 1 1 45%; /* Allows each graph-wrapper to take up 45% of the container's width */
    margin: 10px; /* Adds some margin between the graph wrappers */
    box-sizing: border-box; /* Ensures padding and border are included in the element's total width and height */
  }

  NetworkGraph {
    width: 100%; /* Ensure the NetworkGraph takes the full width of its container */
  }
</style>