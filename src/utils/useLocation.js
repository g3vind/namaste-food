import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";


const useLocation1 = () => {
  const [location, setLocation] = useState(null);
  const [city,setCity] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);
          setLocation({ latitude, longitude });
          
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((response) => response.json())
            .then((data) => {
              
              setCity(data.address);
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          toast.error(error.message, { duration: 5000 });
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return [location,city];
};
export default useLocation1;
