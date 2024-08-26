import { IoIosSearch, IoIosArrowForward } from "react-icons/io";

const Filter = ({categories, types}) => {

    return (
        <div className="w-full lg:w-1/4 lg:max-w-56">
            <div className="block rounded-md overflow-hidden">
                <div className="space-y-2">

                    <details className="overflow-hidden rounded border border-gray-300">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                            <input type="text" className="text-sm font-medium outline-none" placeholder="Pesquisar" />
                            <span className="transition group-open:-rotate-180">
                                <IoIosSearch />
                            </span>
                        </summary>
                    </details>

                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Preço </span>
                            <span className="transition group-open:-rotate-180">
                                <IoIosArrowForward />
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                <li>
                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                        <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />
                                        <span className="text-sm font-medium text-gray-700"> Baratos </span>
                                    </label>
                                </li>

                                <li>
                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                        <input type="checkbox" id="FilterPreOrder" className="size-5 rounded border-gray-300" />
                                        <span className="text-sm font-medium text-gray-700"> Caros </span>
                                    </label>
                                </li>

                            </ul>
                        </div>
                    </details>

                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Categoria </span>
                            <span className="transition group-open:-rotate-180">
                                <IoIosArrowForward />
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                {categories.map((categ, index) => (
                                    <li key={index}>
                                        <label className="inline-flex items-center gap-2">
                                            <input type="checkbox" className="size-5 rounded border-gray-300" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {`${categ.name} (${categ.count})`}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>

                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Carroceria </span>
                            <span className="transition group-open:-rotate-180">
                                <IoIosArrowForward />
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                {types.map((tp, index) => (
                                    <li key={index}>
                                        <label className="inline-flex items-center gap-2">
                                            <input type="checkbox" className="size-5 rounded border-gray-300" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {`${tp.name} (${tp.count})`}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>

                </div>
            </div>
        </div>
    );
};

export default Filter;
