insert into groups (
    group_name,
    group_description,
    private_group
) values (
    ${name},
    ${description},
    ${privateGroup}
)
returning group_id;