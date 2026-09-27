"use client";

class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  public isMuted = true;
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("audio_muted");
      if (stored === "true") {
        this.isMuted = true;
      }
    }
  }

  load(id: string, src: string, loop = false, volume = 1) {
    if (typeof window === "undefined") return;
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    this.sounds[id] = audio;
  }

  init() {
    if (this.initialized || typeof window === "undefined") return;
    this.load("bgm", "/audio/bgm.mp3", true, 0.4);
    this.load("hover", "/audio/hover.mp3", false, 0.2);
    this.load("click", "/audio/click.mp3", false, 0.5);
    this.load("impact", "/audio/impact.mp3", false, 0.8);
    this.initialized = true;
  }

  private audioCtx: AudioContext | null = null;

  private initCtx() {
    if (!this.audioCtx && typeof window !== "undefined") {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  play(id: string) {
    if (this.isMuted || typeof window === "undefined") return;
    
    // Synthesize hover sound if we don't have the file
    if (id === "hover" && !this.sounds["hover"]) {
      this.synthHover();
      return;
    }

    if (!this.sounds[id]) return;
    
    if (!this.sounds[id].loop) {
      const clone = this.sounds[id].cloneNode() as HTMLAudioElement;
      clone.volume = this.sounds[id].volume;
      clone.play().catch(() => {});
    } else {
      this.sounds[id].play().catch(() => {});
    }
  }

  private synthHover() {
    this.initCtx();
    if (!this.audioCtx) return;
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.type = "sine";
    // Tech UI hum
    osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, this.audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (typeof window !== "undefined") {
      localStorage.setItem("audio_muted", String(this.isMuted));
      localStorage.setItem("audio_user_set", "true");
    }

    if (this.isMuted) {
      if (this.sounds["bgm"]) this.sounds["bgm"].pause();
    } else {
      if (this.sounds["bgm"]) this.sounds["bgm"].play().catch(() => {});
      this.initCtx(); // init context on user interaction
    }
    return this.isMuted;
  }

  unmuteAndStart() {
    // Only unmute if the user hasn't explicitly muted it before
    if (typeof window !== "undefined") {
      const userSet = localStorage.getItem("audio_user_set");
      const isMutedStored = localStorage.getItem("audio_muted");
      
      if (userSet === "true" && isMutedStored === "true") {
        this.isMuted = true;
        return; // Keep it muted
      }
      
      // Otherwise, turn it on and save that preference
      this.isMuted = false;
      localStorage.setItem("audio_muted", "false");
    } else {
      this.isMuted = false;
    }

    if (this.sounds["bgm"]) this.sounds["bgm"].play().catch(() => {});
    this.initCtx(); // init context on user interaction
  }
}

export const audioManager = new AudioManager();
