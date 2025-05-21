interface LoaderProps {
  fullWidth?: boolean;
  message?: string; // Mensaje opcional
}

const Loader: React.FC<LoaderProps> = ({ fullWidth = false, message }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullWidth ? 'h-screen' : 'h-100'} bg-transparent`}>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      {message && <p className="mt-4 text-lg text-gray-500">{message}</p>} {/* Muestra el mensaje si existe */}
    </div>
  );
};

export default Loader;