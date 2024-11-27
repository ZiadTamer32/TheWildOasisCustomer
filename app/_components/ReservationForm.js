"use client";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { creatingBooking } from "../_library/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id
  };
  const date = !(startDate && endDate);
  const createBookingWithData = creatingBooking.bind(null, bookingData);
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center ">
        <p>Logged in as</p>
        <div className="flex items-center gap-2">
          <img src={user.image} className="h-8 rounded-full" />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={(formData) => {
          createBookingWithData(formData), resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              className="h-6 w-6  accent-[#c69963] focus:ring focus:ring-[#c69963] focus:ring-offset-2"
              name="hasBreakfast"
              id="hasBreakfast"
            />
            <label
              htmlFor="hasBreakfast"
              className="text-primary-300 text-[18px]"
            >
              Do you want breakfast?
            </label>
          </div>
          {date ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton label="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
