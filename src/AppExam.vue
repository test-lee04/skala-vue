<script setup>
import SampleOne from './components/VueDirective/SampleOne.vue';
import SampleTwo from './components/VueDirective/SampleTwo.vue';
import VBind from './components/VueDirective/VBind.vue';
import VBind2 from './components/VueDirective/VBind2.vue';
import VBind3 from './components/VueDirective/VBind3.vue';
import VBind4 from './components/VueDirective/VBind4.vue';
import VHtml from './components/VueDirective/VHtml.vue';
import VIfElse from './components/VueDirective/VIfElse.vue';
import VShow from './components/VueDirective/VShow.vue';
import VText from './components/VueDirective/VText.vue';
import VXss from './components/VueDirective/VXss.vue';
import VFor from './components/VueDirective/VFor.vue';
import VOn from './components/VueDirective/VOn.vue';
import VEvent from './components/VueDirective/VEvent.vue';
import VModifier from './components/VueDirective/VModifier.vue';
import VMemo from './components/VueDirective/VMemo.vue';
import VModel from './components/VueDirective/VModel.vue';
import VHtmlForm from './components/VueDirective/VHtmlForm.vue';
import VModelModifier from './components/VueDirective/VModelModifier.vue';

import RefExample from './components/ReactiveState/RefExample.vue';
import ReactiveExample from './components/ReactiveState/ReactiveExample.vue';
import ComputedExample from './components/ReactiveState/ComputedExample.vue';
import MultiSourceWatchExample from './components/ReactiveState/MultiSourceWatchExample.vue';
import DeepWatchExample from './components/ReactiveState/DeepWatchExample.vue';
import PropsEmitsParent from './components/Props&Emits/PropsEmitsParent.vue';
import SlotDefaultParent from './components/Slot/SlotDefaultParent.vue';
import SlotNamedParend from './components/Slot/SlotNamedParend.vue';
import SlotScopedParent from './components/Slot/SlotScopedParent.vue';
</script>

<template>
  <header>
    <div style="padding: 20px">
      <SampleOne />
      <br />
      <SampleTwo />
      <br />
      <h1>Vue Directive</h1>
      <VHtml />
      <br />
      <VXss />
      <br />
      <VText />
      <br />
      <VBind />
      <br />
      <VBind2 />
      <br />
      <VBind3 />
      <br />
      <VBind4 />
      <br />
      <VIfElse />
      <br />
      <VShow />
      <br />
      <VFor />
      <br />
      <VOn />
      <br />
      <VEvent />
      <br />
      <VModifier />
      <br />
      <VMemo />
      <br />
      <VModel />
      <br />
      <VHtmlForm />
      <br />
      <VModelModifier />
      <br />
      <RefExample />
      <br />
      <ReactiveExample />
      <br />
      <ComputedExample />
      <br />
      <MultiSourceWatchExample />
      <br />
      <DeepWatchExample />
      <br />
      <ReactiveExample />
      <br />
      <PropsEmitsParent />
      <br />
      <SlotDefaultParent />
      <br />
      <SlotNamedParend />
      <br />
      <SlotScopedParent />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
