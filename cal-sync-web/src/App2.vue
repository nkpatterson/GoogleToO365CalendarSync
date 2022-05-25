<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #3e7cd2;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 50%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}

#logo {
    margin-bottom: 25px;
    text-transform: lowercase;
}

#logo #gcal {
  float: left;
}

#logo #gcal img {
    width: 30px;
    padding-top: 2px;
}

#logo #o365 { 
  float: left;
}

#logo #o365 img {
    width: 32px;
    padding-top: 2px;
}

#logo #divider {
    float: left;
    font-size: 1.7em;
    margin-left: 8px;
    margin-right: 4px;
    margin-top: 1px;
    color: #3e7cd2;
}

#logo #divider img {
    width: 45px;
    vertical-align: bottom;
    padding-bottom: 3px;
}

#logo #app-title {
    font-size: 1.8em;
    margin-left: 4px;
    float: left;
    font-family: serif;
}

.btn-bar {
  text-align: center;
}
</style>
<template>
    <div id="logo">
      <div id="divider">{<img src="/src/assets/wombat.png" alt="Wombat logo" />}</div>
      <div id="app-title">Wombat Calendar Sync Engine</div>
      <div style="clear:both;"></div>
    </div>
    <router-view></router-view>
</template>