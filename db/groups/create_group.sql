insert into groups (
    group_name,
    group_description,
    private_group,
    group_image
) values (
    ${name},
    ${description},
    ${privateGroup},
    ${image}
)
returning group_id;