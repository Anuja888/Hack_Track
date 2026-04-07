// The backend API computes the dynamic year using algorithms that check the current month/year and the student's batch year (from roll number).
// This frontend utility is left as a placeholder if client-side validation is needed.
export const validateRollNumber = (roll) => {
    const regex = /^1602-\d{2}-73[2-7]-\d{3}$/;
    return regex.test(roll);
};
