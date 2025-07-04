const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const otpRecord = await OtpVerification.findOne({ userId });

        if (!otpRecord) return res.status(400).json({ error: 'OTP not found' });

        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ error: 'OTP expired' });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // OTP is valid, delete it (optional)
        // await OtpVerification.deleteOne({ _id: otpRecord._id });

        // Generate JWT
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: 'OTP verified successfully', token });
    } catch (err) {
        res.status(500).json({ error: 'OTP verification failed', details: err.message });
    }
};
module.exports = { verifyOtp };