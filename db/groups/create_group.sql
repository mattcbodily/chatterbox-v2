insert into groups (
    group_name,
    group_description,
    private_group
) values (
    ${name},
    ${description},
    ${private}
)
returning group_id;