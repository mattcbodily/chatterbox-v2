select m.message, m.sender, u.username, u.email, u.image from messages m
join users u on m.sender = u.user_id
where group_id = ${id};