namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;

public class VolunteerOperationReportDTO
{
    public DateTime OperationDate { get; set; }
    public string Activity { get; set; }
    public string Location { get; set; }
    public string Address { get; set; }
    public string Responsible { get; set; }
    public string Observations { get; set; }
    public int Status { get; set; }

    public VolunteerOperationReportDTO(
        DateTime operationDate, 
        string activity, 
        string location, 
        string address, 
        string responsible, 
        string observations,
        int status)
    {
        OperationDate = operationDate;
        Activity = activity;
        Location = location;
        Address = address;
        Responsible = responsible;
        Observations = observations;
        Status = status;
    }
}

