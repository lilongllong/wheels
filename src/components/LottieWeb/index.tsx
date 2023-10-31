import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

import animationJSON from './largeAnimation.json';
import styles from './index.less';

export default function LottieWeb(props: {}) {
  const lottieRef = useRef();
  const [lottieInstance, setLottieInstance] = useState<AnimationItem>();
  const fallback = null;
  useEffect(() => {
    // 启动动画
    if (lottieRef.current) {
      const ins = lottie.loadAnimation({
        animationData: animationJSON,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        container: lottieRef.current
      });
      setLottieInstance(ins);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.lottie} ref={lottieRef} />
    </div>
  );
}
