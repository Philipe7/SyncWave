const { readData, writeData } = require('../models/data');

exports.getAll = (req, res) => {
  try {
    const data = readData();
    res.status(200).json({ message: 'Dados recuperados com sucesso', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar dados', error: error.message });
  }
};

exports.getOne = (req, res) => {
  try {
    const data = readData();
    const item = data.find(d => d.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json({ message: 'Item recuperado com sucesso', data: item });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar item', error: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
    }

    const data = readData();
    const newItem = { id: Date.now(), name, description };
    data.push(newItem);
    writeData(data);

    res.status(201).json({ message: 'Item criado com sucesso', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar item', error: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
    }

    let data = readData();
    const index = data.findIndex(d => d.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    data[index] = { ...data[index], name, description };
    writeData(data);

    res.status(200).json({ message: 'Item atualizado com sucesso', data: data[index] });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar item', error: error.message });
  }
};

exports.remove = (req, res) => {
  try {
    let data = readData();
    const filteredData = data.filter(d => d.id !== parseInt(req.params.id));
    if (data.length === filteredData.length) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    writeData(filteredData);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir item', error: error.message });
  }
};