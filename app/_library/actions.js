"use server";
import { auth, signIn, signOut } from "@/app/_library/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuestProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,24}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function creatingBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed"
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) {
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(id) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(session.user.guestId);
  const bookingsID = bookings.map((booking) => booking.id);
  if (!bookingsID.includes(id)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservations(updatedFields) {
  const numGuests = updatedFields.get("numGuests");
  const bookingId = updatedFields.get("bookingId");
  const observations = updatedFields.get("observations");
  const updatedData = { numGuests, observations };
  if (!bookingId) {
    console.error("Invalid params:", params);
    throw new Error("Booking ID is missing");
  }
  // Authencation
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Authrization
  const bookings = await getBookings(session.user.guestId);
  const bookingsID = bookings.map((booking) => booking.id);
  if (!bookingsID.includes(id)) {
    throw new Error("You are not allowed to delete this booking");
  }
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", Number(bookingId))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function signInActions() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutActions() {
  await signOut({ redirectTo: "/" });
}
