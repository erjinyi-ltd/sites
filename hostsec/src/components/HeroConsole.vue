<script setup lang="ts">
import type { SiteCopy } from '../types'

defineProps<{ copy: SiteCopy['console'] }>()

const hosts = [
  { name: 'edge-web-01', platform: 'Linux', address: '10.24.8.12' },
  { name: 'finance-api-02', platform: 'Linux', address: '10.24.8.31' },
  { name: 'ops-win-03', platform: 'Windows', address: '10.24.9.17' },
]
</script>

<template>
  <div class="hero-console" aria-hidden="true">
    <div class="console-window-bar">
      <span class="window-dots"><i /><i /><i /></span>
      <code>tenant.gcsa.hostsec</code>
      <span class="live-indicator"><i />{{ copy.live }}</span>
    </div>
    <div class="console-body">
      <aside class="console-sidebar">
        <div class="console-mark">HS</div>
        <span class="sidebar-item is-active">01<small>{{ copy.overview }}</small></span>
        <span class="sidebar-item">02<small>{{ copy.hosts }}</small></span>
        <span class="sidebar-item">03<small>{{ copy.events }}</small></span>
        <span class="sidebar-item">04<small>{{ copy.policies }}</small></span>
      </aside>
      <div class="console-main">
        <div class="console-title-row">
          <div><span>SECURITY OVERVIEW</span><strong>{{ copy.title }}</strong></div>
          <span class="console-updated"><i />{{ copy.updated }}</span>
        </div>
        <div class="console-stats">
          <article><span>{{ copy.totalHosts }}</span><strong>128</strong><small>+8 this month</small></article>
          <article><span>{{ copy.online }}</span><strong>124</strong><small class="positive">96.8%</small></article>
          <article><span>{{ copy.openEvents }}</span><strong class="warning">03</strong><small>1 high priority</small></article>
          <article><span>{{ copy.activeTasks }}</span><strong>06</strong><small>all reporting</small></article>
        </div>
        <div class="console-grid">
          <section class="host-table">
            <header><strong>{{ copy.hosts }}</strong><span>128 total</span></header>
            <div class="host-table-head"><span>{{ copy.hostName }}</span><span>{{ copy.platform }}</span><span>{{ copy.status }}</span></div>
            <div v-for="host in hosts" :key="host.name" class="host-row">
              <span><i /> <b>{{ host.name }}</b><small>{{ host.address }}</small></span>
              <span>{{ host.platform }}</span>
              <span class="protected"><i />{{ copy.protected }}</span>
            </div>
          </section>
          <section class="signal-panel">
            <header><strong>SIGNAL MAP</strong><span>LIVE</span></header>
            <div class="signal-map">
              <i class="ring ring-a" /><i class="ring ring-b" />
              <span class="signal-core">CP</span>
              <span class="signal-node node-a">LNX</span>
              <span class="signal-node node-b">WIN</span>
              <span class="signal-node node-c">WAF</span>
              <span class="signal-line line-a" /><span class="signal-line line-b" /><span class="signal-line line-c" />
            </div>
          </section>
        </div>
      </div>
    </div>
    <span class="floating-pill pill-one"><i /> 124 AGENTS ONLINE</span>
    <span class="floating-pill pill-two">POLICY RECEIPT · OK</span>
  </div>
</template>
