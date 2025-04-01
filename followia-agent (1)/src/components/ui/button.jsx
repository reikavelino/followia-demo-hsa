
export function Button({ children, onClick, variant = 'default', className }) {
  const style = variant === 'outline' ? 'border border-gray-400 text-gray-700' : 'bg-blue-600 text-white';
  return <button onClick={onClick} className={`px-4 py-2 rounded ${style} ${className}`}>{children}</button>;
}
