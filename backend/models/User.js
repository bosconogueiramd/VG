const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },  // ✅ Adicionado email obrigatório
  password: { type: String, required: true },
  userType: { type: String, required: true }
});

// ✅ Garantindo que o modelo seja reutilizado caso já exista
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
