import './LoadingDots.css';

export function LoadingDots() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="animate-bounce dot"></div>
      <div className="animate-bounce200 dot"></div>
      <div className="animate-bounce400 dot"></div>
    </div>
  );
}
