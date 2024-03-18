import { Pagination, PaginationRootProps } from "@ark-ui/solid";
import { For, ParentProps } from "solid-js";
import AngleIcon from "../icons/AngleIcon";

export default (props: ParentProps<PaginationRootProps>) => {
  return (
    <Pagination.Root {...props} class="pagination">
      {(api) => (
        <>
          <Pagination.PrevTrigger class="pagination-link pagination-link-prev">
            <AngleIcon iconDirection="left" class="w-5 h-5" />
          </Pagination.PrevTrigger>

          <For each={api().pages}>
            {(page, index) =>
              page.type === "page" ? (
                <Pagination.Item
                  {...page}
                  class="pagination-link"
                  classList={{
                    "pagination-link-active": page.value === api().page,
                  }}
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis index={index()} class="pagination-link">
                  &#8230;
                </Pagination.Ellipsis>
              )
            }
          </For>

          <Pagination.NextTrigger class="pagination-link pagination-link-next">
            <AngleIcon iconDirection="right" class="w-5 h-5" />
          </Pagination.NextTrigger>
        </>
      )}
    </Pagination.Root>
  );
};
