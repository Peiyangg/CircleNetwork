<script>
  import NetworkGraphLeft from '$lib/components/NetworkGraphLeft.svelte';
  import NetworkGraphRight from '$lib/components/NetworkGraphRight.svelte';
  // import NetworkGraphLeft from '$lib/components/NetworkGraphLeft_mice_e.svelte';
  // import NetworkGraphRight from '$lib/components/NetworkGraphRigh_mice_l.svelte';
  
  import { createNetworkStores } from './stores';


  export let data = {};
  let sizeTime = 7;
  let networkHeight ;
  let networkWidth ;

  $: if (typeof window !== 'undefined') {
   networkWidth = Math.min(window.innerWidth * 0.45); // 45% of viewport width, max 800px
   networkHeight = window.innerHeight * 0.35; // 40% of viewport height
 }

  const LinkedData = createNetworkStores();

// +--------------+-----------------------------+---------------------------+
// |   rockwool   | ES (sampletime 1,2,3)       | LS (sampletime 3,4,5)    |
// +--------------+-----------------------------+---------------------------+
// | Healthy      | json file 1                 | json file 2              |
// | Infested     | json file 3                 | json file 4              |
// | In-between   | json file 5                 | json file 6              |
// +--------------+-----------------------------+---------------------------+
// Note: Sample time 3 is included in both stages to ensure sufficient samples for correlation

//               
// +------------+-------------+
// | Water      | ALl samples |
// +------------+-------------+
// | Healthy    | json file 7 |
// | Infested   | json file 8 |
// | In-between | json file 9 |
// +------------+-------------+
// Note: data actually ask 
</script>

<main>
  <h1>Network Graph</h1>

  <div class="graphs-container">
      <div class="graph-wrapper">
          <h2>Healthy Greenhouse Water Sample</h2>
          <NetworkGraphLeft graph={data.r_healthy_l} {networkWidth} {networkHeight} {sizeTime} stores={LinkedData}/>
        </div>

        <div class="graph-wrapper">
          <h2>Infested Greenhouse Water Sample</h2>
          <NetworkGraphRight graph={data.r_infested_l} {networkWidth} {networkHeight} {sizeTime} stores={LinkedData}/>
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
    justify-content: space-between; /* Changed from space-around */
    width: 100%; /* Add this */
    max-width: 100vw; /* Add this */
    padding: 0 20px; /* Optional padding */
  }

  .graph-wrapper {
    flex: 0 0 48%; /* Changed from 45% */
    min-width: 300px;
    max-width: none; /* Remove any max-width constraints */
  }

  NetworkGraph {
    width: 100%; /* Ensure the NetworkGraph takes the full width of its container */
  }
</style>