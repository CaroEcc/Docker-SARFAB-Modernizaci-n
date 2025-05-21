import VolunteerActiveDetail from "@/components/volunteer/views/VolunteerActiveDetail";
import VolunteerHistoricalDetail from "@/components/volunteer/views/VolunteerHistoricalDetail";

export default function DetailVolunteerView() {
  const queryParams = new URLSearchParams(window.location.search);
  const isHistoricalData = queryParams.get("historicalData"); 
  const isOpen = !!isHistoricalData; 

  return isOpen ? <VolunteerHistoricalDetail /> : <VolunteerActiveDetail />;
}