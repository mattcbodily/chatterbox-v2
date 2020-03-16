module.exports = {
    getGroups: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.groups.get_groups({id})
        .then(groups => res.status(200).send(groups))
        .catch(err => res.status(500).send(err))
    },
    createGroup: async(req, res) => {
        const {id, name, description, private} = req.body,
              db = req.app.get('db');

        let newGroup = await db.groups.create_group({name, description, private});

        db.groups.user_group_join({id, groupId: newGroup[0].group_id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}