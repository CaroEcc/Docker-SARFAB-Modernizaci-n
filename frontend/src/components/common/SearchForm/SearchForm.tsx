import { RiSearch2Line } from "@remixicon/react"

const SearchForm = () => {
    return (
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute top-1/2 left-0 -translate-y-1/2">
              <RiSearch2Line size={20} className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" />
            </button>

            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
            />
          </div>
        </form>
    )
}

export default SearchForm;