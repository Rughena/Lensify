/**
 * Creating AR utilities for advanced facial detection and frame positioning
 * Uses MediaPipe for reliable face landmark detection
 */

export interface FaceLandmarks {
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  noseTip: { x: number; y: number };
  leftJaw: { x: number; y: number };
  rightJaw: { x: number; y: number };
  mouthLeft: { x: number; y: number };
  mouthRight: { x: number; y: number };
  faceWidth: number;
  faceHeight: number;
  centerX: number;
  centerY: number;
  scale: number;
}

export interface FrameConfig {
  bridgeWidth: number;
  armLength: number;
  height: number;
  tilt: number;
}

// Standard frame configurations for different styles
export const frameConfigs: Record<string, FrameConfig> = {
  standard: { bridgeWidth: 0.35, armLength: 1.2, height: 0.4, tilt: 0 },
  aviator: { bridgeWidth: 0.3, armLength: 1.1, height: 0.35, tilt: 2 },
  round: { bridgeWidth: 0.25, armLength: 1.0, height: 0.35, tilt: 0 },
  square: { bridgeWidth: 0.4, armLength: 1.3, height: 0.42, tilt: -1 },
};

/**
 * Calculate frame positioning based on detected face landmarks
 */
export function calculateFramePosition(
  landmarks: FaceLandmarks,
  frameConfig: FrameConfig
): {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
} {
  const faceWidth = landmarks.faceWidth;
  const eyeDistance = Math.abs(landmarks.rightEye.x - landmarks.leftEye.x);

  // Frame dimensions relative to detected eye distance
  const frameWidth = faceWidth * 1.1;
  const frameHeight = frameWidth * 0.4;

  // Position frame centered between eyes
  const eyeCenterX = (landmarks.leftEye.x + landmarks.rightEye.x) / 2;
  const eyeCenterY = (landmarks.leftEye.y + landmarks.rightEye.y) / 2;

  // Calculate rotation based on eye positions
  const eyeAngle = Math.atan2(
    landmarks.rightEye.y - landmarks.leftEye.y,
    landmarks.rightEye.x - landmarks.leftEye.x
  );

  return {
    x: eyeCenterX - frameWidth / 2,
    y: eyeCenterY - frameHeight / 2.5,
    width: frameWidth,
    height: frameHeight,
    rotation: (eyeAngle * 180) / Math.PI + frameConfig.tilt,
  };
}

/**
 * Draw glasses frame with realistic styling on canvas
 */
export function drawGlassesFrame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  color: string = '#2c3e50',
  frameImage?: HTMLImageElement
) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate((rotation * Math.PI) / 180);

  if (frameImage) {
    // Draw frame image if available
    ctx.drawImage(frameImage, -width / 2, -height / 2, width, height);
  } else {
    // Draw geometric frame as fallback
    const lensWidth = width * 0.45;
    const lensHeight = height * 0.8;
    const bridgeWidth = width * 0.1;
    const armHeight = height * 0.15;

    // Left lens
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, lensWidth, lensHeight, 8);
    ctx.fill();
    ctx.stroke();

    // Right lens
    ctx.beginPath();
    ctx.roundRect(width / 2 - lensWidth, -height / 2, lensWidth, lensHeight, 8);
    ctx.fill();
    ctx.stroke();

    // Bridge
    ctx.fillStyle = color;
    ctx.fillRect(-bridgeWidth / 2, -armHeight / 2, bridgeWidth, armHeight);

    // Left arm
    ctx.fillRect(-width / 2 - 20, -armHeight / 2, 20, armHeight);

    // Right arm
    ctx.fillRect(width / 2, -armHeight / 2, 20, armHeight);
  }

  ctx.restore();
}

/**
 * Detect if face is suitable for try-on (proper lighting, angle, etc.)
 */
export function validateFaceQuality(
  landmarks: FaceLandmarks,
  imageData: ImageData
): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check if face is centered enough
  if (
    landmarks.centerX < imageData.width * 0.2 ||
    landmarks.centerX > imageData.width * 0.8
  ) {
    issues.push('Face not centered - please center your face');
  }

  if (
    landmarks.centerY < imageData.height * 0.1 ||
    landmarks.centerY > imageData.height * 0.7
  ) {
    issues.push('Face position incorrect - adjust your position');
  }

  // Check eye distance (indicates face is visible)
  const eyeDistance = Math.abs(
    landmarks.rightEye.x - landmarks.leftEye.x
  );
  if (eyeDistance < 20) {
    issues.push('Face too small - move closer to camera');
  }

  if (eyeDistance > imageData.width * 0.6) {
    issues.push('Face too large - move further from camera');
  }

  // Check lighting by analyzing brightness
  const data = imageData.data;
  let brightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    brightness +=
      (data[i] + data[i + 1] + data[i + 2]) / 3; // Average RGB
  }
  brightness /= data.length / 4;

  if (brightness < 50) {
    issues.push('Too dark - improve lighting');
  } else if (brightness > 220) {
    issues.push('Too bright - reduce glare');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
