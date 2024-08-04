// adjust the data time format for display
export default function  datetimeFormat(beforeFormat){
    const updateFormat = new Date(beforeFormat);
    return updateFormat.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true, 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });

}