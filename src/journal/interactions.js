const button = document.getElementById('journal-button');
const indicator = document.getElementById('journal-button-indicator');

button.addEventListener('click', () => indicator.hidden = true);

const beep = new Audio("data:audio/mpeg;base64,//MkxAAHIFpoAUwQAQICIobJYlk8liWBAGhYqdmZm/i9e/8AAiAHx/D1Y+w2Blpy//MkxAYJMJ60AZkoAOHRwgeQHO6LLCIg2wp2fiFVHmUMLnARQ5Exrd+ZRB2GRsY///MkxAQIMI7NAc9IA81YScCzMAdDM+Eycd23pu3DQ61IZnK64Ld/TCItsAGurgAz//MkxAYIwI7SYDJeBF0mQBkaJTTtkYOfnUzFSUdM0bI+W2zLJVklXKUsIAF/8AcV//MkxAYJOJKqQFYWNKgMFB3zKCELt0AN1CsdzMgpuTTnfz05s1N7JRFolpQAO7QB//MkxAQIUI6hoFYYKMoqBXY06acJkTCZSSZgX9hdt2qJtcEUkX7DbR5NagABdtQH//MkxAUHkI6mQDvQDH7toTI0xaQJbVwNi1FUbSntfWBJni5rEomqAAFl2AL/KKJy//MkxAkHWJKiQCvQDA9WRA1gi3x+OLMpu58GLZaS4EorFVshPcLtLLQH4KDSbEJX//MkxA4HWJKEQMDSjJ3oACG91apcmobK8hGqP6oSL36ytrBlISw4WMItPdHA0boT//MkxBMHeJJ8QMGEiIxcNT63oLr8CAlRi++S3UQAXJI0THBSdUDOyc1NeED0ZSYv//MkxBgHuI5wAMmOhFqCYra7Quxq+V+1Os8EjBXC4y2zL3AIzrDUo9eRmq5cD8Ze//MkxBwHgI5sAMJKhBEHCOfNsQIgGS6gZsLuS8L6VzIzDWQ0hlUDLjdEFgGHgGQp//MkxCEHAI5sAG4KKNoCtDqp9HDe5wRWPE3KhWs2S3kJLbFJlQfLL1PTIMjbCqja//MkxCgHKHJkAG6MDcC0jtHFgGJRQNQtVhHYJnI5UANGLfdTqBQECIpN+X1cd2T7//MkxC4HgI5gAIZGDDEsKegYjNCImccz6+CNJzXL+TWl3gsMM1kaAau3Hz/Z1FYJ//MkxDMHcI5kAMZGRDaEzvVNdZEW+UlOVjVsVSdXIlGZAo+AuC5kkTWQ2uDoYyMA//MkxDgI0IpQAMaSDSCU+TFRTZvx6JYdhDwYf8EliiZVS07xOuVSwmxCBiWpxzix//MkxDcJWI5MAMaSDOWmtEEQCFpnECci5vcODauc6KC+B111KybdPhISAA7VyQwm//MkxDQJ2JJIANJUiAjeTcBjRzTtga6wsfspkdBFL/lexknvRaq5Su4y8POCyCFY//MkxC8IwI5MAMoSiGiWHX0f/MljZkt8/IwKbOMuewiVESm75eDZMxhXywSY6umj//MkxC8H0I5QAM4QRIAvCJGJoaRyVGBrG6IFokWqXkUlaqBPoDJFgDOKgVhR2UP///MkxDIHaI5QAH4KKKkEuhCNK8sMtDB1AQkF2wABxpRaACs495KCw8Sipk0xlYrA//MkxDcHqIpEAMjKiV1NTFv/oXoXMxV1VNqC3HUKAKNEbmriSPQ0jSVDMITgs4DA//MkxDsKGDpwfjJSQMw9BYCCQjM/ireyTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqq//MkxDUHMF3wAEsMCKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
beep.volume = 0.4;

const indicatorAnimation = [
  { offset: 0, opacity: 0, scale: 0.1, translate: '0 50%' },
  { offset: 0.5, opacity: 1, scale: 1.2, translate: '0 0' },
  { offset: 0.7, opacity: 1, scale: 0.9, translate: '0 0' },
  { offset: 1, opacity: 1, scale: 1, translate: '0 0' },
];

export const flashIndicator = (symbol, shouldBeep = false) => {
  if (symbol) {
    indicator.innerText = symbol;
  }
  indicator.hidden = false;
  indicator.animate(indicatorAnimation, { duration: 800, fill: 'both' });

  if (shouldBeep) {
    beep.play();
  }
};

window.flashIndicator = flashIndicator;
