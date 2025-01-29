import pg from 'pg';
import { weaponNames, statuses, confirmationCodes } from '../assets/asset.js';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// get list of all gadgets in inventory
const listGadgets = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM gadget_inventory');
    // adding random probability to weapons
    const list = response.rows.map(gadget => {
      const probabilty = Math.floor(Math.random() * 100);
      return {
        ...gadget,
        name: `${gadget.name} - ${probabilty}% success probability`,
      };
    });
    res.send(list);
  } catch (error) {
    console.log('Failed to fetch gadgets', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const filterGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status || !statuses.includes(status)) {
      return res.send({
        message: `Please enter a${!status ? '' : ' valid'} status`,
      });
    }
    const response = await pool.query(
      'SELECT * FROM gadget_inventory WHERE status = $1',
      [status]
    );
    res.send(response.rows);
  } catch (error) {
    console.log('Failed to fetch filtered gadgets', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//
// generates a unique random weapon name
const generateWeaponName = data => {
  const usedNames = data.map(item => item.name);
  let randomName = '';
  for (let i = 0; i < 200; i++) {
    const idx = Math.floor(Math.random() * weaponNames.length);
    randomName = weaponNames[idx];
    if (!usedNames.includes(randomName)) {
      return randomName;
    }
  }
};

// add a gadget into inventory, need to provide the status
const addGadget = async (req, res) => {
  try {
    const inventory = await pool.query('SELECT name FROM gadget_inventory');
    const name = generateWeaponName(inventory.rows);

    const response = await pool.query(
      'INSERT INTO gadget_inventory (name, status) VALUES ($1, $2) RETURNING *',
      [name, 'Available']
    );
    res.send(response.rows);
  } catch (error) {
    console.log('Failed to add gadget in inventory', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//
// update a gadget in inventory, need to provide the name and status, and it will update the status
const updateGadget = async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!statuses.includes(status)) {
      return res.send({ message: 'Please enter a valid status' });
    }
    const response = await pool.query(
      'UPDATE gadget_inventory SET status = $2 WHERE name = $1 RETURNING *',
      [name, status]
    );
    if (response.rows.length < 1) {
      return res.send({
        message: 'Gadget name not found, please enter a valid name',
      });
    }
    res.send(response.rows);
  } catch (error) {
    console.log('Failed to update gadget', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//
// delete a gadget from inventory, need to provide the name, and it will set status='Decommisioned'
const deleteGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const timestamp = new Date();

    const response = await pool.query(
      'UPDATE gadget_inventory SET status = $2, timestamp = $3 WHERE name = $1 RETURNING *',
      [name, 'Decommissioned', timestamp]
    );
    if (response.rows.length < 1) {
      return res.send({
        message: 'Gadget name not found, please enter a valid name',
      });
    }
    const result = response.rows[0];
    result.timestamp = result.timestamp.toLocaleString('en-IN');
    res.send(result);
  } catch (error) {
    console.log('Failed to delete gadget', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//
// generates a unique random weapon name
const generateConfirmationCode = () => {
  const idx = Math.floor(Math.random() * confirmationCodes.length);
  return confirmationCodes[idx];
};

// destroy a gadget from inventory, need to provide the name and confirmation code, and it will set status='Destroyed'
const destroyGadget = async (req, res) => {
  try {
    const { id, code } = req.query;
    if (!code || !confirmationCodes.includes(code)) {
      const random_code = generateConfirmationCode();
      return res.send({
        message: `Please enter a${
          !code ? '' : ' valid'
        } confirmation code - (try ${random_code})`,
      });
    }
    const response = await pool.query(
      'UPDATE gadget_inventory SET status = $2 WHERE id = $1 RETURNING *',
      [id, 'Destroyed']
    );
    if (response.rows.length < 1) {
      return res.send({
        message: 'Gadget ID not found, please enter a valid ID',
      });
    }
    res.send(response.rows);
  } catch (error) {
    console.log('Failed to destroy gadget', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  listGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  destroyGadget,
  filterGadgets,
};
