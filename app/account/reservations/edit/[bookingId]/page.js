import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservations } from "@/app/_library/actions";
import { getBooking, getCabin } from "@/app/_library/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const { cabinId, observations, numGuests } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservations}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
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
          <SubmitButton label="Updating...">Update Reservation</SubmitButton>
        </div>
      </form>
    </div>
  );
}
