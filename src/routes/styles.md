---
name: 'styles'
title: 'Style Guide'
---

<script>
  import { colors } from '../styles.js'
  import ColorChart from '../components/misc/color-chart.svelte'
  import { Tabs, Tab } from '../components/misc/tabs'
  import Alert from '../components/misc/alert.svelte'
  import PhotoGrid from '../components/misc/photo-grid.svelte'

  let showAlert = true
  const closeAlert = () => { showAlert = false }
</script>

<div id="colors">

  <ColorChart colors={colors} />

</div>

<div id="headings">

  # Heading level 1
  ## Heading level 2
  ### Heading level 3
  #### Heading level 4
  ##### Heading level 5
  ###### Heading level 6

</div>

<div id="text">

  Nulla vitae elit libero, a pharetra augue. [This is an internal link.](/) Maecenas sed diam eget risus varius blandit sit amet non magna. [This is ALSO an internal link.](/blog) Maecenas sed diam eget risus varius blandit sit amet non magna. [This is a link to an external site.](https://sapper.svelte.dev) Aenean lacinia bibendum nulla sed consectetur. [This is a link to a subdomain.](https://colors.ryanfiller.com)

  Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

  *Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.*
  _Sed posuere consectetur est at lobortis._
  _*Nulla vitae elit libero, a pharetra augue.*_

  - Donec sed odio dui.
  - Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - Donec sed odio dui.
    - Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  1. Donec sed odio dui.
  2. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

</div>

<div id="code">

This is an `inline code sample`.

These are line highlighted code blocks:

```html {1, 3-5, 11}
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
  </head>
  <body>
    <div>
        <p>Hello world!</p>
    </div>

    <!-- other markup goes here -->
  </body>
</html>
```

```css {2,3}
h1 {
  /* purple is my favorite color! */
  color: purple;
}
```

```javascript {3, 10}
function factorial(n) {
  if (n === 0) {
    return 1; // 0! = 1
  }

  return n * factorial(n - 1);
}

// returns 6
factorial(3);
```

</div>

<div id="blockquotes">

  > Any sufficiently advanced technology is indistinguishable from magic.
  > ***
  > [Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke)

  > Unless someone like you cares a whole awful lot,
  > Nothing is going to get better. It's not.
  > ***
  > The Lorax

  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">I need to make a tweet embed component for my blog.</p>&mdash; Ryan Filler (@ryanfiller_) <a href="https://twitter.com/ryanfiller_/status/1259280535421140998?ref_src=twsrc%5Etfw">May 10, 2020</a></blockquote>

</div>

<div id="tables">
  
  <!-- TODO need to figure out how to do table caption -->
  <!-- ?? https://www.npmjs.com/package/remark-grid-tables -->

  | Eddard Stark          | Jon Snow                   | Arya Stark               |
  |:--------------------- |:-------------------------- |:------------------------ |
  | Has a sword named Ice | Has a sword named Longclaw | Has a sword named Needle |
  | No direwolf           | Direwolf: Ghost            | Direwolf: Nymeria        |
  | Lord of Winterfell    | Knows nothing              | No one                   |

</div>

<div id="tabs">

  <Tabs name='test-tabs'>
    <Tab title='Bulbasaur'>

      ![#001 Bulbasaur](https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png){data-small="true" data-align="left"}

      Bulbasaur (Japanese: フシギダネ Fushigidane) is a dual-type Grass/Poison Pokémon introduced in Generation I.

      It evolves into Ivysaur starting at level 16, which evolves into Venusaur starting at level 32. 

    </Tab>
    <Tab title='Charmander'>

      ![#004 Charmander](https://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/250px-004Charmander.png){data-small="true" data-align="left"}

      Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I.

      It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36. 

    </Tab>
    <Tab title='Squirtle'>

      ![#007 Squirtle](https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png){data-small="true" data-align="left"}

      Squirtle (Japanese: ゼニガメ Zenigame) is a Water-type Pokémon introduced in Generation I.

      It evolves into Wartortle starting at level 16, which evolves into Blastoise starting at level 36. 

    </Tab>
  </Tabs>

</div>

<div id="alert">

  <Alert
    show={showAlert}
    close={closeAlert}
    title='We are under attack!'
  >
    Your warriors have engaged the enemy!
  </Alert>

</div>

<div id="images">

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="full"}

  Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I'd say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam.

  Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="left"}

  It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.

  Sensors indicate no shuttle or other ships in this sector. According to coordinates, we have travelled 7,000 light years and are located near the system J-25. Tractor beam released, sir. Force field maintaining our hull integrity. Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed. Without our shields, at this range it is probable a photon detonation could destroy the Enterprise.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="right"}

  Communication is not possible. The shuttle has no power. Using the gravitational pull of a star to slingshot back in time? We are going to Starbase Montgomery for Engineering consultations prompted by minor read-out anomalies. Probes have recorded unusual levels of geological activity in all five planetary systems. Assemble a team. Look at records of the Drema quadrant. Would these scans detect artificial transmissions as well as natural signals?

  We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="center"}

  Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies. Resistance is futile. Recommend we adjust shield harmonics to the upper EM band when proceeding. These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions. Increase deflector modulation to upper frequency band.

  Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I'd say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="left" data-small="true"}

  Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.' All transporters off.

  I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="right" data-small="true"}

  Now what are the possibilities of warp drive? Cmdr Riker's nervous system has been invaded by an unknown microorganism. The organisms fuse to the nerve, intertwining at the molecular level. That's why the transporter's biofilters couldn't extract it. The vertex waves show a K-complex corresponding to an REM state. The engineering section's critical. Destruction is imminent. Their robes contain ultritium, highly explosive, virtually undetectable by your transporter.

  Communication is not possible. The shuttle has no power. Using the gravitational pull of a star to slingshot back in time? We are going to Starbase Montgomery for Engineering consultations prompted by minor read-out anomalies. Probes have recorded unusual levels of geological activity in all five planetary systems. Assemble a team. Look at records of the Drema quadrant. Would these scans detect artificial transmissions as well as natural signals?

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-align="center" data-small="true"}

  Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

  It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.

</div>

<div id="figures">

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a full width image" data-align="full"}

  Sensors indicate human life forms 30 meters below the planet's surface. Stellar flares are increasing in magnitude and frequency. Set course for Rhomboid Dronegar 006, warp seven. There's no evidence of an advanced communication network. Total guidance system failure, with less than 24 hours' reserve power. Shield effectiveness has been reduced 12 percent. We have covered the area in a spherical pattern which a ship without warp drive could cross in the given time.

  I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a left aligned image" data-align="left"}

  Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

  Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. What is the strength of the ship's deflector shields at maximum output? The wormhole's size and short period would make this a local phenomenon. Do you have sufficient data to compile a holographic simulation?

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a right aligned image" data-align="right"}

  Sensors indicate no shuttle or other ships in this sector. According to coordinates, we have travelled 7,000 light years and are located near the system J-25. Tractor beam released, sir. Force field maintaining our hull integrity. Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed. Without our shields, at this range it is probable a photon detonation could destroy the Enterprise.

  Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.' All transporters off.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a center aligned image" data-align="center"}

  It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.

  It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a left aligned, small image" data-align="left" data-small="true"}

  We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.

  Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I'd say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a right aligned, small image" data-align="right" data-small="true"}

  Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.' All transporters off.

  Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

  ![alt](/images/site-assets/placeholders/jpeg.jpg 'title'){data-caption="this is a center aligned, small image" data-align="center" data-small="true"}

  Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. What is the strength of the ship's deflector shields at maximum output? The wormhole's size and short period would make this a local phenomenon. Do you have sufficient data to compile a holographic simulation?

  We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.

</div>

<div id="gifs">

  ![alt](/images/site-assets/placeholders/gif.gif 'title'){data-caption="this is a gif" data-align="full"}

</div>

<div id="iframes">
  
  <iframe src='https://ryan-responsive-iframe.netlify.com/' title='full embed' data-aspect-ratio="full"></iframe>

  <iframe src='https://ryan-responsive-iframe.netlify.com/' title='wide screen' data-aspect-ratio="16/9"></iframe>

  <iframe src='https://ryan-responsive-iframe.netlify.com/' title='standard embed' data-aspect-ratio="4/3"></iframe>

</div>

<div id="videos">

  ![alt](/images/site-assets/placeholders/video.mp4 'title'){data-caption="this is a video" data-align="full"}

  It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.

  ![alt](/images/site-assets/placeholders/video.mp4 'title'){data-align="center" data-small="true"}

  Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. What is the strength of the ship's deflector shields at maximum output? The wormhole's size and short period would make this a local phenomenon. Do you have sufficient data to compile a holographic simulation?

  ![alt](/images/site-assets/placeholders/video.mp4 'title'){data-align="left"}

  Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I'd say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam. Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. 

  ![alt](/images/site-assets/placeholders/video.mp4 'title'){data-align="right"}

  Communication is not possible. The shuttle has no power. Using the gravitational pull of a star to slingshot back in time? We are going to Starbase Montgomery for Engineering consultations prompted by minor read-out anomalies. Probes have recorded unusual levels of geological activity in all five planetary systems. Assemble a team. Look at records of the Drema quadrant. Would these scans detect artificial transmissions as well as natural signals? Now what are the possibilities of warp drive? Cmdr Riker's nervous system has been invaded by an unknown microorganism. The organisms fuse to the nerve, intertwining at the molecular level. That's why the transporter's biofilters couldn't extract it.

</div>