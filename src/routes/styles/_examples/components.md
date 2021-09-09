<script>
  // TODO put stuff in lib directory
  import { Tabs, Tab } from '../../../components/misc/tabs'
  import Note from '../../../components/misc/note.svelte'
  let showNote = true
  const closeNote = () => { showNote = false }
  import Alert from '../../../components/misc/alert.svelte'
  let showAlert = false
  const closeAlert = () => { showAlert = false }
  import PhotoGrid from '../../../components/misc/photo-grid.svelte'

</script>

<div id="tabs">

  <Tabs name='test-tabs'>
    <Tab title='Bulbasaur'>

      ![#001 Bulbasaur](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png){data-small="true" data-align="left"}

      Bulbasaur (Japanese: フシギダネ Fushigidane) is a dual-type Grass/Poison Pokémon introduced in Generation I.

      It evolves into Ivysaur starting at level 16, which evolves into Venusaur starting at level 32. 

    </Tab>
    <Tab title='Charmander'>

      ![#004 Charmander](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png){data-small="true" data-align="left"}

      Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I.

      It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36. 

    </Tab>
    <Tab title='Squirtle'>

      ![#007 Squirtle](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png){data-small="true" data-align="left"}

      Squirtle (Japanese: ゼニガメ Zenigame) is a Water-type Pokémon introduced in Generation I.

      It evolves into Wartortle starting at level 16, which evolves into Blastoise starting at level 36. 

    </Tab>
  </Tabs>

</div>

---

<div id="note">

  <Note
    show={showNote}
    close={closeNote}
    title='We are under attack!'
  >
    Your warriors have engaged the enemy!
  </Note>

</div>

---

<div id="alert">

  <button
    on:click={() => showAlert = true}
    style='width: 100%;'
  >
    Show Alert?
  </button>

  <Alert
    show={showAlert}
    close={closeAlert}
    title='This is an alert!'
  >
    Have you chosen to show the alert.
    <svelte:fragment slot='actions'>
      <button on:click={() => closeAlert()}>
        Close Alert.
      </button>
    </svelte:fragment>
  </Alert>

</div>
