export interface FilterRangeDateProps {
  onChange: (range: { startDate: string | undefined; endDate: string | undefined }) => void;
  refetch: () => void;
}
