import { auth } from "../_library/auth";
import { getBookedDatesByCabinId, getSettings } from "../_library/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [bookedDate, settings, session] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
    auth()
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector cabin={cabin} bookedDate={bookedDate} settings={settings} />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
