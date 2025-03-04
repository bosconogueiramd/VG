const Step = require('../models/stepModel');

const registerStepRouter = (router) => {
  // Obter todos os passos
  router.get('/steps', async (req, res) => {
    try {
      const steps = await Step.find();
      res.status(200).json(steps);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar passos' });
    }
  });

  // Obter um passo por ID
  router.get('/steps/:id', async (req, res) => {
    try {
      const step = await Step.findById(req.params.id);
      res.status(200).json(step);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar passo' });
    }
  });

  // Atualizar um passo por ID
  router.put('/steps/:id', async (req, res) => {
    try {
      const step = await Step.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(step);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar passo' });
    }
  });
};

module.exports = registerStepRouter;
