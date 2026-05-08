import { useEffect, useMemo, useRef, useState } from 'react';

const pad = (n) => n.toString().padStart(3, '0');

const SETTINGS = {
  desktop: { count: 201, path: '/desktop-frames' },
  mobile: { count: 240, path: '/mobile-frames' },
};

const getMode = () => (window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop');

const BackgroundCanvas = ({ progress = 0 }) => {
  const canvasRef = useRef(null);
  const imageCache = useRef(new Map());
  const activeFrame = useRef(0);
  const rafRef = useRef(0);
  const progressRef = useRef(progress);
  const [mode, setMode] = useState('desktop');

  const sequence = useMemo(() => SETTINGS[mode], [mode]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const handleResize = () => setMode(getMode());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const srcFor = (index) => `${sequence.path}/ezgif-frame-${pad(index + 1)}.jpg`;
    const loadFrame = (index) => {
      if (index < 0 || index >= sequence.count) return null;
      const key = `${mode}-${index}`;
      if (imageCache.current.has(key)) return imageCache.current.get(key);

      const image = new Image();
      image.decoding = 'async';
      image.loading = 'eager';
      image.src = srcFor(index);
      imageCache.current.set(key, image);
      return image;
    };

    const draw = (index) => {
      const image = loadFrame(index);
      if (!image || !image.complete || image.naturalWidth === 0) {
        image?.addEventListener('load', () => draw(index), { once: true });
        return;
      }

      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.fillStyle = '#030304';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, x, y, width, height);
    };

    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      draw(activeFrame.current);
    };

    const hydrateWindow = (center) => {
      for (let i = center - 5; i <= center + 11; i += 1) loadFrame(i);
    };

    const renderFromProgress = () => {
      const target = Math.min(sequence.count - 1, Math.max(0, Math.round(progressRef.current * (sequence.count - 1))));

      if (target !== activeFrame.current) {
        activeFrame.current = target;
        draw(target);
        hydrateWindow(target);
      }
    };

    const tick = () => {
      renderFromProgress();
      rafRef.current = requestAnimationFrame(tick);
    };

    resizeCanvas();
    hydrateWindow(0);
    draw(0);
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mode, sequence]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-night" data-sequence-mode={mode}>
      <canvas ref={canvasRef} className="block h-screen w-screen opacity-100" aria-hidden="true" />
      <div className="desktop-cinema-grade absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(190,0,35,0.22),transparent_32%),linear-gradient(90deg,rgba(1,1,3,0.9),rgba(1,1,3,0.22)_48%,rgba(1,1,3,0.78))]" />
      <div className="mobile-cinema-grade absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(225,0,45,0.22),transparent_38%),linear-gradient(to_bottom,rgba(1,1,3,0.38),rgba(1,1,3,0.88)_72%,rgba(1,1,3,0.94))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),rgba(0,0,0,0.7))]" />
      <div className="watermark-ve veil-noise absolute bottom-0 right-0 h-24 w-64 max-w-[52vw] rounded-tl-[3rem] border-l border-t border-white/5 bg-black/20 backdrop-blur-2xl" />
    </div>
  );
};

export default BackgroundCanvas;
