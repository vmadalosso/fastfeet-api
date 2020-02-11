import * as Yup from 'yup';
import Deliverers from '../models/Deliverers';

class DeliverersController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryMans = await Deliverers.findAll({
      attributes: ['id', 'name', 'email'],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveryMans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryManExists = await Deliverers.findOne({
      where: { name: req.body.name },
    });

    if (deliveryManExists) {
      return res.status(400).json({ message: 'Delivery man already exists' });
    }

    const { id, name, email } = await Deliverers.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryMan = await Deliverers.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json({ error: 'Delivery Man does not exists' });
    }

    const { name, email } = await deliveryMan.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new DeliverersController();
