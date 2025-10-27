import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// 1. นี่คือ Component "กลุ่มดาว" ของเรา
function Particles() {
  const ref = useRef();
  
  // 2. สร้างจุดสุ่ม 5,000 จุด ให้อยู่ใน "ทรงกลม" รัศมี 1.2
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  // 3. (Animation) ให้มันหมุนช้าๆ และขยับตามเมาส์
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15; // หมุนแกน X
    ref.current.rotation.y -= delta / 20; // หมุนแกน Y

    // (ลูกเล่น!) ให้มันเอียงตามเมาส์เล็กน้อย
    ref.current.position.x = Math.sin(state.pointer.x * 0.5) * 0.2;
    ref.current.position.y = Math.sin(state.pointer.y * 0.5) * 0.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#08fdd8" // สี Cyan ที่เราใช้
          size={0.004} // ขนาดของจุด (เล็กๆ)
          sizeAttenuation={true} // ให้จุดที่อยู่ไกล เล็กลง
          depthWrite={false} // ปิดการเขียน z-buffer (เพื่อให้มันโปร่งแสงสวยงาม)
        />
      </Points>
    </group>
  );
}

// 4. นี่คือ Component หลักที่จะ 'หุ้ม' Canvas ไว้
export default function ParticleBackground() {
  return (
    // เราจะ 'fixed' มันไว้หลังสุด ให้เต็มจอ
    <div className="w-full h-full fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}