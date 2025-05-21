const Spinner = ({ size = 16 }: { size?: number }) => (
  <div
    className="inline-block animate-spin rounded-full border-2 border-t-transparent border-blue-500"
    style={{ width: size, height: size }}
  />
);

export default Spinner;
