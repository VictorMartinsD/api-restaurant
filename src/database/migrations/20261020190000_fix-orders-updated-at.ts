import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasUpdatedAt = await knex.schema.hasColumn("orders", "updated_at");
  const hasUpdated = await knex.schema.hasColumn("orders", "updated");

  if (!hasUpdatedAt && hasUpdated) {
    await knex.schema.alterTable("orders", (table) => {
      table.renameColumn("updated", "updated_at");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasUpdatedAt = await knex.schema.hasColumn("orders", "updated_at");
  const hasUpdated = await knex.schema.hasColumn("orders", "updated");

  if (hasUpdatedAt && !hasUpdated) {
    await knex.schema.alterTable("orders", (table) => {
      table.renameColumn("updated_at", "updated");
    });
  }
}
