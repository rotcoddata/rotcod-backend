const Bundle = require('../models/Bundle');
const User = require('../models/User');

exports.getBundles = async (req, res) => {
    try {
        const bundles = await Bundle.find();
        res.json(bundles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.purchaseBundle = async (req, res) => {
    const { userId, bundleId } = req.body;
    try {
        const bundle = await Bundle.findById(bundleId);
        if (!bundle) return res.status(404).json({ error: "Bundle not found" });
        bundle.soldTo = userId;
        await bundle.save();
        res.json({ message: "Bundle purchased successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};